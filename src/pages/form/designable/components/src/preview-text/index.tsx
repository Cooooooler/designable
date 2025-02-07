import {
  Cascader, DatePicker, DateRangePicker,
  Input,
  InternalPreviewText, NumberPicker, Placeholder,
  Select, TimePicker, TimeRangePicker,
  TreeSelect, usePlaceholder
} from "./previewText";

// @ts-ignore
export const PreviewText  = Object.assign(InternalPreviewText, {
  Input,
  Select,
  TreeSelect,
  Cascader,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  Placeholder,
  usePlaceholder,
  NumberPicker,
})
