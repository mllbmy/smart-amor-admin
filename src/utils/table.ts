import { ref } from "vue";

export const tableFontSize = ref({
    style: {
        fontSize: "20px",
    }
});
export const customHeaderRow = () => {
    return tableFontSize.value
};
export const customRow = () => {
    return tableFontSize.value
};