import App from './app';

const app = new App();
app.listen(() => {
    console.log('Server listen in port ', app.port);
});