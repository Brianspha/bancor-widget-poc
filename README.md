# bancor-widget-poc

### This is a work in progress




This is no where close to being showcased or ran as its heavily bugged im commiting just to satify the boundty requirement of making a submission


## Usage

### NPM

To do i will upload to npm later on in the day

### Vanilla Setup

Copy the dist folder into your project and see [the example folder](https://github.com/Brianspha/bancor-widget-poc/tree/master/example)
for how to use the widget

``` 
 <bancor-widget buttoncolor='#F44336' widgetcolor='#F44336' />

 ```

Currently the only available props are 
1. widgetColor
2. buttonColor


Future props will include the ability to change the position of the floating action bar

### Widget Color and Button Color

For color reference please look at the vuetify website [vuetify website](https://vuetifyjs.com/en/styles/colors)

### Notice

At the moment creation addition of new bancor pools i.e. funding of liqudity pools is only restricted to official tokens this will change in the near future when i get more time, basically querying tokens from the subgraph

## Project setup
```
npm install
```
## Running localy
To run the project locally run

```
embark run --nodashboard
embark run simulator
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
