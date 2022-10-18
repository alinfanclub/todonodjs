<template>
  <div id="ListVue">
    <SpinnerVue v-if="this.$store.state.loading == true"></SpinnerVue>
    <!-- <div class="sort_type">
         <label for="date">시 종류</label>
         <select class="w-100" v-model="selectType">
            <option value="전체">전체</option>
            <option value="자작 시">자작 시</option>
            <option value="가져온 시">가져온 시</option>
         </select>
    </div> -->
    <table>
        <colgroup>
            <col width="25%">
            <col width="25%">
            <col width="25%">
            <col width="25%">
        </colgroup>
        <thead>
            <tr>
                <th>No.</th>
                <th>Tilte</th>
                <th>Type</th>
                <th>date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(list, i) in paginatedData" :key="i">
                <td>{{i+1}}</td>
                <td><span class="cursor" @click="goToContent(list._id)">{{list.text}}</span></td>
                <td>{{list.selectType}}</td>
                <td>{{list.date}}</td>
            </tr>
        </tbody>
    </table>

    <div class="btn-cover pagiNation">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  </div>
</template>

<script>
import SpinnerVue from "./spinner/SpinnerVue.vue"
export default {
    data() {
        return {
            selectType: '전체',
            pageNum: 0,
            pageSize: 10,
            page:''
        }
    },
    components : {
        SpinnerVue
    },
    created() {
        this.$store.dispatch("FETCH_POST_LIST");
    },
    computed: {
        postListReverse () {
            return this.$store.state.postlist.slice().reverse();
        },
        pageCount () {
            let listLeng = this.$store.state.postlist.length,
                listSize = this.pageSize,
                page = Math.floor(listLeng / listSize);
            if (listLeng % listSize > 0) page += 1;
            
            /*
            아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
            이런식으로 if 문 없이 고칠 수도 있다!
            */
            return page;
        },
        paginatedData () {
            const start = this.pageNum * this.pageSize,
                    end = start + this.pageSize;
            return this.postListReverse.slice(start, end);
        }
    },
    methods: {
        goToContent(e) {
            this.$router.push("/list/" + e)
        },
        nextPage () {
        this.pageNum += 1;
        },
        prevPage () {
            this.pageNum -= 1;
        }
    }
}
</script>

<style scoped>
    #ListVue {
        width: 80%;
        margin: 0 auto;
        color: #333;
    }
    table {
        width: 100%;
        margin-top: 100px;
    }
    table th, table td {
        height: 75px;
        text-align: center;
        border: 0.5px solid #333;
        border-right: none;
        border-left: none;
    }
    table th {
        border-top: none;
    }
    table tbody tr:hover td{
        background-color: #555;
        color: #fff;
    }
    table span.cursor {
        cursor: pointer;
    }
    .sort_type {
        display: flex;
        align-items: center;
        width: 20%;
    }
    .sort_type label {
        width: 100px;
    }
    .pagiNation {
        width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        background-color: #fff;
        border-top: 1px dashed #ddd;
    }
    #pagiNation button {
        border: none;
        min-width: 20px;
        padding: 5px;
        margin: 0 10px;
        background-color:transparent;
    }
    .btn-cover {
        margin-top: 1.5rem;
        text-align: center;
    }
    .btn-cover .page-btn {
        width: 5rem;
        height: 2rem;
        letter-spacing: 0.5px;
    }
    .btn-cover .page-count {
        padding: 0 1rem;
    }
    .noData {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>