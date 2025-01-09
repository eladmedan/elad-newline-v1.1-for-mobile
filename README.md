# הדרכה לאלעד


## הוראות איך להפעיל שרת לוקאלי של הפרוייקט שלך במחשב ללא חיבור אינטרנט 🪄

מדריך מוקלט: https://www.loom.com/share/6f884a6335d14246b41404d56b94b5fb

### הוראות שצריך לבצע פעם אחת בלבד במחשבים:

1. להתקין PYTHON אם אין מכאן: https://www.python.org/downloads/
2. להתקין VS CODE אם אין מכאן: https://code.visualstudio.com/
*שים לב!* בהתקנה של VS CODE זה ישאל אותך אם להוסיף קיצור דרך לתיקיה. תסמן בV.

### כדי להפעיל את השרת:

1. בכל שינוי שנעשה באפליקציה, תצטרך להוריד קובץ ZIP מעודכן. מורידים את המעודכן ביותר בקישור הבא: https://elad.elrons.co.il/dist.zip 
(הקישור לא עובד עדיין, יעבוד בקרוב – בינתיים צירפתי קובץ DIST כאן בווצאפ).
2. אתה מעביר את קובץ הזיפ למחשב חסר־האינטרנט ומחלץ אותו.
3. פותח את התיקייה באמצעות VS CODE (מקש ימני על התיקייה ואז "Open with Code")
4. פותח את ה־Terminal על ידי הקשה של CTRL + ~ (טילדה)
5. מריץ את הפקודה: python -m http.server (ומקיש אנטר)
6. פותח בדפדפן את הקישור הבא: http://localhost:8000/



# Svelte + TS + Vite

This template should help get you started developing with Svelte and TypeScript in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.
  `vite dev` and `vite build` wouldn't work in a SvelteKit environment, for example.

This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
