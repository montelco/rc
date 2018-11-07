#`_lightbox.scss`
```
Version 1.0
Last Updated: October 14, 2018
Created by: Cory Monteleone
```
***
##Using the Lightbox File

This file is awaiting refactor to remove use of hardcode values. The intent is to create a lightbox for modal, usually used by the FAB element.

```
.lightbox {
  background-color: rgba(0,0,0,.85);  
  overflow: hidden;
  position: fixed;
  display: none;
  z-index: 100000000000000000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
```

The position is fixed to properly overlay and the positioning is stacked to allow for it to appear over all other items.

```  
  .lightbox-container {
    flex: 1;
    position: relative;
    max-width: 960px;
    display: block;    
    height: auto;
    z-index: 10;
  }
```

The container which will hold the content is relative to the lightbox parent element.

```
  .lightbox-content {
    box-shadow: 0 1px 6px fade(black, 70%);
  }
```

The content container should have a drop shadow to stand it off of the modal blur.

```
  .lightbox-close {
    text-transform: uppercase;    
    background: transparent;
    position: absolute; 
    font-weight: 300;      
    font-size: 12px;
    display: block;
    border: none;
    color: white;
    top: -22px;
    right: 3%;
  }
```

The close button should always be at the top right of the container.

```
  .video-container {
    margin: 0 auto;
    border-radius: 4px;  
    position: relative;  
    max-height: 2000px;
    max-width: 530px;
    background: #edf0f2;
    padding: 1.25ch; 
    
    section.wufoo {
      padding: 1ch;
      min-height: 590px;
      h2 + div {height: 100%;}
      .wufoo-form-container {height: 100%;}
    }
  }
```

This block is reused from a legacy project and is awaiting refactor. It creates a container for content and makes the iframes which live in it more flexible.

```
  button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
    background: #2B4978;
    border: none;
    color: white;
    border-radius: 4px;
  }
```

The button to close the modal should be at positioned at the top, inside of the container element.

```
  .video-container iframe,
  .video-container object,
  .video-container embed {
    position: absolute;
    height: 100%;  
    width: 100%;  
    left: 0;  
    top: 0;
    padding: 8px;
  }
}
```

The element within the container should occupy the entire container.
