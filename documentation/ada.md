#`_ada.scss`
```
Version 1.0
Last Updated: September 12, 2018
Created by: Cory Monteleone
```
***
##Using the ADA File

Following standards for [keyboard-based accesibility](https://webaim.org/techniques/skipnav/), skip links (also known as Skip Navigation) can be used to make the experience for differently-abled users to have an enjoyable experience. Without these links, a user would not be able to skip over the numerous navigation links commonly found in an application header. By enabling this feature and placing structural elements directly after the opening of the `body`, this allows a user to determine whether they would like to jump to the content, the navigation, or otherwise. Below are detailed the ways in which this feature, required by the Federal Office of Civil Rights, is implemented.

```

p.skip-link {
  margin: 0;

```

This zone creates the container for the skip links and sets the area as directly above the body without margins between it and the remainder of the body.

```
  a {
    display: block;
    width: 100%;
    padding: 2px 0 3px 0;
    text-align: center;
    background-color: #CFD8E4;
    color: #29568F;

```

`p.skip-link a` is the selector for the skip link itself and specifies that the width is 100% (as a block element), light padding, centered text, and a grey background with a dark blue text color.

```
    
    &.sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

```

`p.skip-link a.sr-only` implies that this is a class intended for screen readers and accesible technology only. Because accessibility in this domain extends to partial sight, the element is still shown. The link is positioned absolute relative to the containing div to allow it to appear as the only link (there are two) until tabbed-through without JavaScript. By default, this is moved offscreen, (margin: -1px with a height and width of 1px).

```

    &.sr-only-focusable:active,
    &.sr-only-focusable:focus {
      position: static;
      width: auto;
      height: auto;
      margin: 0;
      overflow: visible;
      clip: auto;
    }

  }

}

```

`p.skip-link a.sr-only.sr-only-focusable:active (..:focus)` section positions the link above all else with a static position and sets the visibility as the link will now take up the automatic height and width as defined by its container.