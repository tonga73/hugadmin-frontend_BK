import { Theme, Button } from "react-daisyui";

export default (args) => {
  return <Button {...args}>{args.text}</Button>;
};
