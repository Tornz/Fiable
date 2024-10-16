import GridComponent from "../Component/gridComponent";

export default {
  title: "GridComponent",
  component: GridComponent,
};

const Template = (args: any) => <GridComponent {...args} />;

export const DefaultPosition: any = Template.bind({});
DefaultPosition.args = {
  position: "1,1 NORTH",
};

export const EdgeCaseSouth: any = Template.bind({});
EdgeCaseSouth.args = {
  position: "0,0 SOUTH",
};

export const EdgeCaseWest: any = Template.bind({});
EdgeCaseWest.args = {
  position: "4,4 WEST",
};

export const EdgeCaseEast: any = Template.bind({});
EdgeCaseEast.args = {
  position: "0,4 EAST",
};

export const InvalidInput: any = Template.bind({});
InvalidInput.args = {
  position: "5,5 NORTH",
};
