export const onClick = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
      alert(true);
    }, 3000),
  );
