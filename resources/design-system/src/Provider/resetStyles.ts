import { raw } from "coulis";

raw(`*, *:before, *:after {
    box-sizing: inherit;
}`);

raw(`html {
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, roboto,
        oxygen, ubuntu, cantarell, fira sans, droid sans,
        helvetica neue, sans-serif;
    box-sizing: border-box;
    font-size: 14px;
    color: #000000;
}`);

raw(`body, h1, h2, h3, h4, h5, h6, p, ol, ul, strong {
    margin: 0;
    padding: 0;
    font-weight: normal;
    color: inherit;
}`);

raw(`ol, ul {
    list-style: none;
}`);

raw(`a {
    text-decoration: none;
    color: inherit;
}`);
