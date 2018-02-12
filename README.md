# SimpleShare
SimpleShare is a very simple JS library with no dependencies for sharing materials to different social network. 
***

## A few simple steps to install library:

### 1. Install library via npm
       npm i -S simpleshare 
### 2. Import library to you project
    import {SimpleShare} from 'simpleshare'
### 3. Add OG (OpenGraph) markup to your pages
    <meta property="og:title" content="Page title" />
    <meta property="og:url" content="https://example.com" />
    <meta property="og:image" content="https://example.com/example.jpg" />
    <meta property="og:description" content="Description" />
    <meta property="article:author" content="Author" />
### 4. Define elements in your template with data-dcp-share attribute
    <a href="#" data-dcp-share="facebook">Facebook</a>
##### At the current version plugin supports the following social networks and accepts it like a value for data-dcp-share attribute

| Website       | Transport name|
| ------------- | ------------- |
| Facebook      | facebook      |
| Pinterest     | pinterest     |
| Twitter       | twitter       |
| Google Plus   | googleplus    |
| Tumblr        | tumblr        |
| LinkedIn      | linkedin      |
| Reddit        | reddit        |
| LiveJournal   | livejournal   |
| Telegram      | telegram      |
| Buffer        | buffer        |
| Digg          | digg          |
| Stamle        | stamble       |

In the following releases a list of social networks will be increased.

### 5. Call a plugin after DOM is ready
    new SocialShare();

## Additional

Also you can define prefered popup window width and height (by default 500px*500px) via data attributes:

    <a href="#" data-dcp-share="facebook" data-dcp-width="500" data-dcp-height="600">Facebook</a>
    
