export const flexcolumn = new CSSStyleSheet();
flexcolumn.replaceSync(`
    :host{
        display:flex;
        flex-direction: column;
    }
`);
