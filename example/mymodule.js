import env from 'fibe-env';

export default function myFunction() {
    console.log('myModule.js', env.getMeta());
}