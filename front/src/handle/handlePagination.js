import store from "@/store/store";
import { ref, computed } from "vue";

export default function handlePagination() {
  let page = ref(1);

  const data = Array.from(Array(24).keys()).map((item) => {
    return { index: item, value: `this_${item}` };
  });

  const perPage = 2;

  const paginatedData = computed(() =>
  store.state.postlist.slice((page.value - 1) * perPage, page.value * perPage)
);
  const nextPage = () => {
    if (page.value !== Math.ceil(store.state.postlist.length / perPage)) {
      page.value += 1;
    }
  };

  const backPage = () => {
    if (page.value !== 1) {
      page.value -= 1;
    }
  };

  const goToPage = (numPage) => {
    page.value = numPage;
  };

  const del = () => {
    page.value - 1
  }

  return { data, paginatedData, perPage, page, nextPage, backPage, goToPage, del };
}
