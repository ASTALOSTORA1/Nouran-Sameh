// for title 
  const myTitle = "Nouran Sameh";
  
  document.title = myTitle;
  
  const observer1 = new MutationObserver(() => {
    if (document.title !== myTitle) {
      document.title = myTitle;
    }
  });
  
  observer1.observe(
    document.querySelector("title"),
    { childList: true }
  );




// // for favicon Icon
    const existing = document.querySelectorAll("link[rel*='icon']");
    existing.forEach(el => el.remove());
  
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png"; // غيرها لو ico
    link.href = "/data/favicon.ico";
  
    document.head.appendChild(link);
  


  // Icons
// Array من الصور الجديدة اللي عايز تحطها
function removeFramerElement() {
  // اختار العنصر باستخدام class أو data attribute
  const element = document.querySelector('.framer-316rlt-container'); // أو استخدم data-framer-appear-id="316rlt"
  
  if (element) {
    element.remove(); // احذفه من الصفحة
    console.log('Element removed successfully');
  }
}

// شغل الفانكشن لما الصفحة تجهز
window.addEventListener('DOMContentLoaded', removeFramerElement);

let x = []
let projectsData = []
fetch('https://nouran-server.vercel.app/api/json/projects')
  .then(response => response.json())
  .then((data)=>{
x = data 
x.forEach((e,i)=>{
projectsData.push(
  {
    id:e._id,
    imageUrl:e.imageUrl,
    title:e.title,
    description:e.description
  }
)
})

  });





// const projectsData = [
//   {
//     id: 1,
//     imageUrl: '/data/IMG_٢٠٢٦٠١٢٤_٠٠٠٧٢٢.jpg',
//     title: 'Project 1',
//     description: 'Story Love',
//   },
//   {
//     id: 2,
//     imageUrl: '/data/IMG_٢٠٢٦٠١٢٤_٠٠٠٧٣٢.jpg',
//     title: 'Project 2',
//     description: 'Story Love',
//   },
// ];

// وظيفة لإخفاء العنصر الداخلي فقط
function hideInnerFramerElement() {
  const innerElement = document.querySelector('.framer-316rlt-container .framer-hoq2S.framer-1hd3r55');
  if (innerElement) {
    innerElement.style.display = 'none';
    innerElement.style.opacity = '0';
    innerElement.style.pointerEvents = 'none';
    innerElement.style.height = '0';
    innerElement.style.overflow = 'hidden';
  }
}

// وظيفة لإنشاء معرض الصور داخل framer-316rlt-container
function createGalleryInsideContainer() {
  const container = document.querySelector('.framer-316rlt-container');
  if (!container) return false;
  
  // لو المعرض موجود من قبل، متعملهوش تاني
  if (container.querySelector('.my-gallery-inside')) return true;
  
  // أنشئ div للمعرض
  const gallery = document.createElement('div');
  gallery.className = 'my-gallery-inside';
  
  // أضف ستايل CSS للمعرض
  const style = document.createElement('style');
  style.textContent = `
    .my-gallery-inside {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      width: 100%;
      animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .gallery-item {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      background: #141414;
      aspect-ratio: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    
    .gallery-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    
    .item-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
      color: white;
      transform: translateY(5px);
      transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .item-overlay {
      transform: translateY(0);
    }
    
    .item-title {
      font-family: 'Funnel Sans', sans-serif;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .item-category {
      font-family: 'Funnel Sans', sans-serif;
      font-size: 14px;
      opacity: 0.7;
    }
    
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .my-gallery-inside {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }
    }
    
    @media (max-width: 480px) {
      .my-gallery-inside {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }
    
    /* Lightbox */
    .my-lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      cursor: pointer;
      opacity: 0;
      animation: fadeInLB 0.3s forwards;
    }
    
    .my-lightbox img {
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      cursor: default;
    }
    
    @keyframes fadeInLB {
      to { opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
  
  // أضف كل مشروع من الـ objects
  projectsData.forEach(project => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-project-id', project.id);
    
    item.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}" />
      <div class="item-overlay">
        <div class="item-title">${project.title}</div>
        <div class="item-category">${project.description}</div>
    
      </div>
    `;
    
    // عند الضغط على الصورة تفتح Lightbox
    item.addEventListener('click', () => openLightbox(project.imageUrl));
    
    gallery.appendChild(item);
  });
  
  // أضف المعرض داخل framer-316rlt-container
  container.appendChild(gallery);
  return true;
}

// فتح Lightbox
function openLightbox(src) {
  if (document.querySelector('.my-lightbox')) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'my-lightbox';

  const img = document.createElement('img');
  img.src = src;

  lightbox.appendChild(img);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.remove();
  });

  document.body.appendChild(lightbox);
}

// الوظيفة الرئيسية
function main() {
  // 1. أخفي العنصر الداخلي فقط
  hideInnerFramerElement();
  
  // 2. أنشئ المعرض داخل framer-316rlt-container
  const galleryCreated = createGalleryInsideContainer();
  
  return galleryCreated;
}

// راقب framer-316rlt-container بالتحديد
function watchContainer() {
  const container = document.querySelector('.framer-316rlt-container');
  if (!container) return;
  
  // راقب التغييرات في هذا العنصر بالتحديد
  const observer = new MutationObserver((mutations) => {
    // إذا حدث أي تغيير في children، أعد تنفيذ الكود
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        // تأخير بسيط قبل التنفيذ
        setTimeout(main, 100);
        break;
      }
    }
  });
  
  // راقب التغييرات في children فقط
  observer.observe(container, {
    childList: true,
    subtree: false
  });
}

// تهيئة الكود
function init() {
  console.log('جاري إضافة الصور داخل framer-316rlt-container...');
  
  // محاولة أولية
  main();
  
  // راقب العنصر نفسه
  watchContainer();
  
  // راقب document للعنصر إذا ظهر متأخر
  const docObserver = new MutationObserver(() => {
    const container = document.querySelector('.framer-316rlt-container');
    if (container) {
      main();
      watchContainer();
    }
  });
  
  docObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // محاولات متكررة في البداية
  let attempts = 0;
  const maxAttempts = 30; // 30 محاولة
  const retryInterval = setInterval(() => {
    if (document.querySelector('.framer-316rlt-container') || attempts >= maxAttempts) {
      main();
      clearInterval(retryInterval);
    }
    attempts++;
  }, 500);
}

// ابدأ عندما تكون الصفحة جاهزة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// أيضًا، تأكد عند التحميل الكامل للصفحة
window.addEventListener('load', () => {
  setTimeout(init, 1000); // تأخير إضافي لضمان تحميل Framer
});













