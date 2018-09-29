import { css, injectGlobal } from 'emotion';

export const globalStyles = injectGlobal`
  html, body {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera San;
    text-rendering: geometricPrecision;
    margin: 0;
    padding: 0;
  }
`;

export const styles = {
  main: css`
    margin: 0 auto;
    padding: 40px 20px;
    line-height: 2;
    width: 80%;
  `,
  h1: css`
    font-weight: 700;
    color: #000;
    font-size: 14px;
    ::before {
      content: '# ';
      color: rgba(0, 0, 0, 0.5);
    }
  `,
  img: css`
    width: 100%;
  `,
  meta: css`
    color: #424242;
    font-size: 10px;
    line-height: 22px;
    font-style: italic;
  `,
  loading: css`
    ::after {
      content: ' …';
    }
  `,
};
