import sveltePreprocess from 'svelte-preprocess'

// trim spaces between tags
// https://github.com/sveltejs/svelte/issues/189
const tagsRegex1 = /(>)[\s]*([<{])/g;
const tagsRegex2 = /({[/:][a-z]+})[\s]*([<{])/g;
const tagsRegex3 = /({[#:][a-z]+ .+?})[\s]*([<{])/g;
const tagsRegex4 = /([>}])[\s]+(<|{[/#:][a-z][^}]*})/g;
const tagsReplace = '$1$2';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    replace: [
      [tagsRegex1, tagsReplace],
      [tagsRegex2, tagsReplace],
      [tagsRegex3, tagsReplace],
      [tagsRegex4, tagsReplace]
    ]
  })
}
