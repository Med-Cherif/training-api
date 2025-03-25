import ExampleThree from "./components/example-three/ExampleThree";

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
}

// To simulate bad network
export const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, 3000));
};

const App = () => {
  // handle data

  return (
    <div className="App">
      {/* <ExampleOne /> */}
      {/* <ExampleTwo /> */}
      <ExampleThree />
    </div>
  );
};

export default App;
