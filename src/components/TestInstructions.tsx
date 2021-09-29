import { FC } from "react";
import { List } from "../components/List";

export const TestInstructions: FC<{
  paymentMethod: "sepa_debit" | "au_becs_debit";
}> = ({ paymentMethod }) => {
  if (paymentMethod === "sepa_debit") {
    return (
      <List>
        <List.Item>
          Test success IBAN: <code>AT61 1904 3002 3457 3201</code>
        </List.Item>
        <List.Item>
          Test failure IBAN: <code>AT86 1904 3002 3547 3202</code>
        </List.Item>
      </List>
    );
  }

  if (paymentMethod === "au_becs_debit") {
    return (
      <List>
        <List.Item>
          Test BSB number: <code>000-000</code>
        </List.Item>
        <List.Item>
          Test success account number: <code>000123456</code>
        </List.Item>
        <List.Item>
          Test failure account number: <code>111111113</code>
        </List.Item>
      </List>
    );
  }

  return null;
};
