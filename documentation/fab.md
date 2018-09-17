#`_fab.scss`
```
Version 1.0
Last Updated: September 14, 2018
Created by: Cory Monteleone
```
***
##Using the FAB File

This file is used to create the custom element called the Floating Action Button or FAB for short. The intent of the FAB is to promote a primary desired action for a user on a given page. For instance, a FAB might be used to connect to a contact form or it may act as an "Add Entry" button or some other primary action which relates to the view on which it is displayed. For more information about the user experience considerations in using a FAB button, please refer to the [Material Design Documentation regarding FABs](https://material.io/design/components/buttons-floating-action-button.html).

```
fab{
  font-size: 2em;
  font-weight: 400;
  position: fixed;
  height: 2em;
  width: 2em;
  right: 1em;
  bottom: 1em;
  cursor: pointer;
  background-color: $blue;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsla(214, 32%, 97%, 0.96);
  z-index: 12;
  border-radius: 1.25em;
  box-shadow: 1px 8px 16px 0px rgba(0,0,0,0.25);
}
@media screen and (max-width: 767px) {
  fab{
    font-size: 2em;
    font-weight: 400;
    position: fixed;
    height: 3.5rem;
    width: 3.5rem;
    right: 0.75rem;
    bottom: 0.75rem;
    cursor: pointer;
    background-color: $blue;
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsla(214, 32%, 97%, 0.96);
    z-index: 12;
    border-radius: 1.25em;
    box-shadow: 1px 8px 16px 0px rgba(0,0,0,0.25);
  }
}
```

This block, awaiting refactor, is legacy from another project. However, the construction is telling of the use case for this FAB element. First, the FAB is a custom element which is possible in modern browers. You will need a polyfill to support this code in older browsers. When using the FAB, it is necessary to have the `lightbox` included into the compiling file to allow the full use of the FAB. It also require the use of a psuedoclass like focus-within if JavaScript is being avoided on devices.
