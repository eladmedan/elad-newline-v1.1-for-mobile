// @ts-nocheck

// Thanks: https://stackoverflow.com/questions/19355370
// Find the right method, call on correct element
export function launchFullscreen(element = document.documentElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullscreen) {
    element.mozRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}
