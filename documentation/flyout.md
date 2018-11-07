#`_flyout.scss`
```
Version 1.0
Last Updated: October 14, 2018
Created by: Cory Monteleone
```
***
##Using the Flyout File

This file is used to create the title flyout box and its dependencies for use on a carousel slider. The code is awaiting refactor to remove any sort of dependency to the package utilized.

```
.tp-revslider-slidesli {
  position: relative;
}

```

Slated for removal, this block positions the title relative to its container and makes the foundation for the flyout itself.

```

.flyout {
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  right: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      z-index: 6731478625698;
    }

```

The `.flyout` element is created with absolute positioning. It is made as a flexible element and is positioned to the bottom of the relative area which is set in the previous code block.

```

  &.right {
    // -webkit-box-pack: end;
    // -webkit-justify-content: flex-end;
    //     -ms-flex-pack: end;
    //         justify-content: flex-end;
  }
```

Do not use: awaiting linting for removal.

```
  &__container {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 930px;
    @include media (lg) {
      width: 930px;
    }
    @include media (xs) {
      min-width: 100%;
    }
  }
```

The `.flyout__container` is a box which is aligned to the center of its area which is set in the previous block. It is given a max--width consistent with the use of the 1400 Grid used in the design.

```
  &__box {
    
    color: #29568f;
    display: block;
    font: {
      family: sans-serif;
      size: 18pt
    }
    background: rgba(255,255,255,0.925);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    max-height: auto;
    padding: 8px;
    @include media(xs) {
      width: 100%;
      padding: 4px;
    }
    white-space: normal;
    word-wrap: break-word;
    z-index: 1;
    @include media(sm) {
      width: 100%;
    }
```

The `.flyout__box` is awaiting a refactor to leverage SASS variabled tinting functions. It creates a flyout box which is positioned to the bottom of its container and had top rounded corners.

```
    h2 {
      color: inherit !important;
      font: {
        size: 20px;
        weight: 600;
      }
      text-align: center;
      @include media(xs) {
        font: {
          size: 14px;
        }
        margin-bottom: 0;
      }
      @include media(lg) {
        font: {
          size: 24px;
        }
      }
    }

    p {
      color: #2c2d2f !important;
      text-align: center;
      font: {
        weight: 400;
        size: 12px;
      }
      @include media(xs) {
        font: {
          size: 10px;
        }
        margin-bottom: 0.5rem;
      }
      @include media(lg) {
        font: {
          size: 16px;
        }
        margin-bottom: 1.1rem;
      }
    }
```

The above block are typography points for the flyout box.

```
    // a {
    //   display: none;
    //   width: 100%;
    //   text-align: right;
    //   font: {
    //     style: italic;
    //     weight: 600;
    //   }
    //   text-decoration: underline;
    //   color: #d8a60f;
    //   @include hover-focus-active {
    //     color: #d8a60f;
    //   }
    // }
  }
}


```

This block, awaiting refactor, allows for the elements on a page, at various application breakpoints to be altered into a flexible growth and shrink reflow. The original intent was to create columns of equal height at the desktop size.
