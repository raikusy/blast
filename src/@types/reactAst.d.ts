declare namespace JSX {
  import type { ActionPanel, Action, List, Detail, Form } from "raycast-original";

  type BlastNodeProps = {
    serializesKeys?: string[];
  };

  interface IntrinsicElements {
    ActionPanel: ActionPanel.Props & BlastNodeProps;
    Action: Action.Props &
      BlastNodeProps & {
        actionEventName: string;
      };
    List: List.Props & BlastNodeProps;
    ListItem: List.Item.Props & BlastNodeProps;
    EmptyView: List.EmptyView.Props &
      BlastNodeProps & {
        children?: React.ReactNode;
      };
    Detail: Detail.Props & BlastNodeProps;
    Form: Form.Props & BlastNodeProps;
    TextField: Form.TextField.Props &
      BlastNodeProps & {
        onChangeEventName: string;
      };

    NavigationRoot: {
      children?: React.ReactNode;
    };
  }
}
