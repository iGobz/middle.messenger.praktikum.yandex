declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

// declare module '*.scss' {
//   const content: Record<string, string>;
//   export default content;
// }

declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
