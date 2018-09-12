#`_alerts.scss`
```
Version 1.0
Last Updated: September 12, 2018
Created by: Cory Monteleone
```
***
##Using the Alerts File

As part of the efforts to keep students, parents, and the community informed about the happeneings of the Rowan College campus, Alerts are often used to make the popoulation aware of issues, updates, and other important information. In addition to the code detailed here, there is information that relates to the functionality in the JavaScript. Refer the the JavaScript files about Alerts for any information on interactors.

```
.alert-left-arrow,
.alert-right-arrow {
  display: inline-block;
  color: #fff;
  cursor: pointer;
  font-size: 30px;
  padding: 10px;
  opacity: 0.60;
}
```

`.alert-{left|right}-arrow` are selectors for the navigational arrows when there are multiple alerts at the same time. The styles set the display option to occupy more than just an inline style and set the clickable attributes for the elements. The font, using a pictographic font, is set large enough and is padded for a 'lazy' click zone. Additionally, it is set to white exception in some specific cases (see below.)

```
#alerts {
  display: none;
  position: relative;
  width: 100%;
}
```

`#alerts` is the container element which is defaulted to not being visible. The JavaScript file will check the length of contents in the element and if it greater than zero the display is set to block. This element is also full-width.

```
.alert-box {
  .container{padding: 15px 0;}
```

`.alert-box` and `.alert-box .container` help contain the alert and set whitespace on the alert on the top and bottom.

```
  &.yellow  {
    background-color: #FCF8E3;  
    color: #D83F26;
    .alert-left-arrow,
    .alert-right-arrow
    .alert-switch,
    .alert-count {color: #D83F26;}
    .alert-switch,
    .alert-count {border: solid 1px #D64024;}
  }
```

`.alert-box.yellow` allows an alert to occupy a moderate priority and sets a white-yellow background, red text, and correspondingly colored red arrows and buttons.

```
  &.red  {
    background-color: #D64024;  
    color: #fff;
    .alert-left-arrow,
    .alert-right-arrow
    .alert-switch,
    .alert-count {color: #fff}

    .alert-switch,
    .alert-count {border: solid 1px #fff;}
  }
```

`.alert-box.red` allows an alert to occupy a high priority and sets a red background, white text, and correspondingly colored white arrows and buttons.

```
  &.blue  {
    background-color: #6EBAEC;  
    color: #fff;
    .alert-switch,
    .alert-count {
      color: #fff;
      border: solid 1px #fff;
    }
  }
```


`.alert-box.blue` allows an alert to occupy a low priority and sets a blue background, white text, and correspondingly colored white arrows and buttons.

```
  h5 {
    font-size: 24px;
    font-weight: normal;
    a  {color: inherit!important;}
  }
```


`.alert-box h5 {a}` allows the header of the alert to be large and it is set to inherit the color that its container sets (see above options.)

```
  .alert-content {
    font-weight: lighter;
    font-size: 17px;
    a {display: inline;}
  }
```


`.alert-box .alert-content {a}` states that the weight is lighter than the standard and that it is smaller than the title of the alert. Additionally, it takes the container's theme color (see above options.)

```
  .alert-left-arrow,
  .alert-right-arrow,
  .alert-switch {
    &:hover{opacity: 1}
  }
```


`.alert-box .alert-{left|right|switch}{-arrow}:hover ` states that the aforementioned are 100% visible when hovered to demonstrate a state change.

```
  .alert-right-arrow {
    left: 55px;
  }
```

`.alert-box .alert-right-arrow ` is deprecated and will be removed soon.

```
  .alert-switch,
  .alert-count {
    -ms-border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    opacity: 0.40;
    cursor: pointer;
  }
```


`.alert-box .alert-{switch|count} ` rounds the element edges, makes it semi-transparent, and sets a distinction of being clickable.

```
  .alert-count {
    padding: 5px;
    position: relative;
    &:hover {opacity: 1;}
  }
```


`.alert-box .alert-count ` adds padding for a larger button to click and specifies that hovering takes the element to full opacity.

```
  .alert-switch {
    float: right;
    display: inline;
    padding: 10px;
    font-size: 10px;
    font-weight: lighter;
    text-align: center;
    cursor: pointer;
    z-index: 9;
    color: inherit!important;
    -ms-border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    opacity: 0.40;
  }
```

`.alert-box .alert-switch ` adds padding for a larger button to click and specifies that positions the close button to the right of the container and sets opacity to forty percent.

```
  .alert-navigator {
    position: relative;
    .col-3 {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
```
`.alert-box .alert-navigator ` positions the row of arrows (left) and counter (right) relatively and states that the three column (`.alert-box .alert-navigator .col-3`) counter should position the button to the right and vertically in the center. 

```
  .alert-info  {display: none;}
}

```

`.alert-box .alert-info ` is deprecated and will be removed soon.