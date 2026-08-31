/*
 * Reusable light/dark theme toggle.
 *
 * Pairs with a CSS file that defines color tokens on bare :root
 * (light, default), redefines them under
 * `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }`
 * for automatic dark mode, and again under `:root[data-theme="dark"]`
 * for the manual override this script applies.
 *
 * Markup needed on the page:
 *   <button class="theme-toggle" type="button" aria-label="Switch to dark theme">
 *     <span class="theme-toggle-icon" aria-hidden="true">&#9789;</span>
 *   </button>
 *
 * To reuse on another site: drop this file in unchanged and add the
 * button markup above wherever the toggle should live.
 */

(function () {
    var STORAGE_KEY = "theme";

    function systemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function currentTheme() {
        return document.documentElement.getAttribute("data-theme") || systemTheme();
    }

    function updateToggle(theme) {
        var button = document.querySelector(".theme-toggle");
        if (!button) return;

        var icon = button.querySelector(".theme-toggle-icon");
        var next = theme === "dark" ? "light" : "dark";

        if (icon) {
            icon.textContent = theme === "dark" ? "☀" : "☾";
        }
        button.setAttribute("aria-label", "Switch to " + next + " theme");
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);

        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {}

        updateToggle(theme);
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateToggle(currentTheme());

        var button = document.querySelector(".theme-toggle");
        if (button) {
            button.addEventListener("click", function () {
                applyTheme(currentTheme() === "dark" ? "light" : "dark");
            });
        }
    });
})();
