#`_footer.scss`
```
Version 1.0
Last Updated: October 14, 2018
Created by: Cory Monteleone
```
***
##Using the Footer File

This file is used to create the footer and its social icons. Note that the footer uses atomic elements to be constructed, so many of the styles for its creation are elsewhere. This is intentional so as to prevent duplication of code and to reduce overall network payload.

```
.social{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
```

The element for the `.social` media footer is a flexible element which is centered.

```
  &__icon {
    width: 4rem;
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      width: 2.75rem;
    }
    height: auto;
    padding: 0.5rem 0;
  }
}
```

The `.social__icon` element are used and create something which scales according to the breakpoints. 

```
.ownLine{
  @include media(xs) {
    display: block;
  }
}
```

The `.ownLine` is an atomic element, slated for removal in a future version, which makes something display block and use its own line.

```
.mb-mm-35 {
  @include media(mm) {
    margin-bottom: 55px;   
  }
}
```

The element is slated for removal, as it should be moved into a variable function to generate atomic elements. Do not use where possible as it is slated for refactor.

```
.text-align-center {
  text-align: center;
}
```

The element is slated for removal, as it should be moved into a variable function to generate atomic elements. Do not use where possible as it is slated for refactor.
