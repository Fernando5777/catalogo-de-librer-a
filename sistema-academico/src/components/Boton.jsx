function Boton({ children, alHacerClic }) {
  return (
    <button type="button" onClick={alHacerClic}>
      {children}
    </button>
  );
}

export default Boton;