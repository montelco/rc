 export function isMobile(breakpoint = 768) {
    let e = window;
    let a = 'inner';
    if (!('innerWidth'in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    if (e[a + 'Width'] >= breakpoint) {
        return true;
    } else {
        return false;
    }
}