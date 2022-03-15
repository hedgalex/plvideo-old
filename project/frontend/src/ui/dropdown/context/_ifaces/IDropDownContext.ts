import { TDropDownValue } from "../_types/TDropDownValue";

export interface IDropDownContext {
  value: TDropDownValue;
  setValue(value: TDropDownValue): void;
  setDisplayValue(displayValue: any): void;
}