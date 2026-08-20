export default function CategoryBar() {
  return (
    <div style={styles.bar}>
      <span>Electronics</span>
      <span>Mobiles</span>
      <span>Fashion</span>
      <span>Home</span>
      <span>Appliances</span>
    </div>
  );
}

const styles = {
  bar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
    fontWeight: "bold",
  },
};