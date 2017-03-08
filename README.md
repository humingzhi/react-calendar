### react-calendar
> a simple react calendar component

### available options:

| prop | type | meaning | defaults | options |
|---|
| language | string  | * | chinese | chinese/english |
| value | Date | default value of component | null | * |
| daysFormat | string | * | YYYY年MM月DD日 | YYYY/MM/DD |
| open | bool | open when mount | false | true/false |
| onChange | func | trigger when new value chose | undefined | ------ |
| clearWhenCancel | bool | clear when user click `cancel` button | false | true/false |
| viewMode | string | now just support `days` view mode | days | --------- |
| inputProps | object | props for input element | null | -------- |
| closeOnSelect | bool | close when use chose a value | false | true/false |
| closeOnClickOutside | bool | close when use click outside the component | true | true/false |
| disablePanelAnimation | bool | disable animation inside the component | false | true/false |
| panelAnimation | string | animation for the component show up | fade | fade/zoom |