import {Component,createElement} from './framework';
// for(let i of [1,2,3]){
//   console.log(i);
// }

// let a = <div id="a">
//   hello
//           <span>world</span>
//           <span></span>
//           <span></span>
//         </div>
class Carousel extends Component {
  constructor(){
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name,value){
    this.attributes[name] = value;
  }
  render(){
    // console.log(this.attributes);
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for(let record of this.attributes.src){
      let child = document.createElement('div');
      child.style.backgroundImage = `url(${record})`;
      this.root.appendChild(child);
    }
    let position = 0;
    this.root.addEventListener('mousedown',e=>{
      // console.log('down');
      let children = this.root.children;
      let startX = e.clientX;
      let move = event=>{
        let x = event.clientX-startX;

        let current = position-((x-x%500)/500);
        console.log('current:',current);
        for(let offset of [-1,0,1]){
          let pos = current+offset;
          pos = (pos + children.length) % children.length;
          console.log(pos)
          children[pos].style.transition = 'none';
          children[pos].style.transform = `translateX(${-pos*500 + offset*500+x%500}px)`
        }
        // for(let child of children){
        //   child.style.transition = 'none';
        //   child.style.transform = `translateX(${-position*500+x}px)`
        // }
        // console.log('move')
      }
      let up = event=>{
        let x = event.clientX-startX;
        position = (position-Math.round(x/500))%children.length;
        for(let offset of [0,-Math.sign(Math.round(x/500)-x+250*Math.sign(x))]){
          let pos = position+offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = '';
          children[pos].style.transform = `translateX(${-pos*500 + offset*500}px)`
        }
        // for(let child of children){
        //   child.style.transition = '';
        //   child.style.transform = `translateX(${-position*500}px)`
        // }
        document.removeEventListener('mousemove',move);
        document.removeEventListener('mouseup',up);
      }
      document.addEventListener('mousemove',move);
      document.addEventListener('mouseup',up);
    });
    /* let currentIndex = 0;
    setInterval(()=>{
      let children = this.root.children;
      let nextIndex = (currentIndex+1) % children.length;
      let current = children[currentIndex];
      let next = children[nextIndex];
      next.style.transition = 'none';
      next.style.transform = `translateX(${100 - nextIndex*100}%)`;
      setTimeout(()=>{
        next.style.transition = '';
        current.style.transform = `translateX(${-100-currentIndex * 100}%)`;
        next.style.transform = `translateX(${-nextIndex*100}%)`;
        currentIndex = nextIndex;
      },16)
      // current++;
      // current = current % children.length;
      // for(let child of children){
      //   child.style.transform = `translateX(-${current*100}%)`
      // }
    },3000); */
    return this.root;
  }
  mountTo(parent){
    parent.appendChild(this.render());
  }
}
let d =[
  'https://static001.geekbang.org/resource/image/82/af/823ef28a64096b4ffce19bca16a573af.jpg',
  'https://static001.geekbang.org/resource/image/1d/6b/1d57a4fde1c266da2e6a8e90808f5b6b.jpg',
  'https://static001.geekbang.org/resource/image/ee/70/ee7627bac9defb7621c2489fbacb3a70.jpg',
  'https://static001.geekbang.org/resource/image/6f/29/6f1f05eade56923b829571ed9ce27329.jpg'
];
let a = <Carousel src={d}></Carousel>

// document.body.appendChild(a);
a.mountTo(document.body);