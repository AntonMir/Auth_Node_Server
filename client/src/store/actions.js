export const CHANGE_AUTH_PAGE_CHOSEN_FORM = "CHANGE_AUTH_PAGE_CHOSEN_FORM"

export function changeAuthPageChosenForm(status) {
    return {
        type: CHANGE_AUTH_PAGE_CHOSEN_FORM,
        status: status
    }
}