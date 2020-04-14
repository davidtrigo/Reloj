export const button = new CSSStyleSheet();
button.replaceSync(`
button {
    background-color: black;
    border:none;
    width: 100%;
    height: 100%;
}
button:active {
    outline: none;
    border: none;
}
    
button:focus {outline:0;}

i{

    border: solid gray;
    border-width: 0 0.188rem 0.188rem 0;
    display: inline-block;
    padding: 0.313rem;
}
button:hover>i{
    border: solid white;
    border-width: 0 0.188rem 0.188rem 0;
}

.previous{
    margin-top: 0.625rem;
    transform: rotate(-135deg);
}
.next{
    transform: rotate(45deg);
}
`)
