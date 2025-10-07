

export const removePaginationLinksTags= ()=>{
    document.querySelectorAll("link[rel='prev']").forEach(link => link.remove());
    document.querySelectorAll("link[rel='next']").forEach(link => link.remove());
}