const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    const productDetails = document.getElementById('productDetails');

    const title = document.createElement('h2');
    title.textContent = product.title;
    productDetails.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `Preço: $${product.price}`;
    productDetails.appendChild(price);

    const description = document.createElement('p');
    description.textContent = `Descrição: ${product.description}`;
    productDetails.appendChild(description);

    const category = document.createElement('p');
    category.textContent = `Categoria: ${product.category}`;
    productDetails.appendChild(category);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('text-center'); // Centralizar a imagem e o texto

    const image = document.createElement('img');
    image.src = product.image;
    image.style.maxWidth = '300px'; // Definir largura máxima da imagem
    imageContainer.appendChild(image);
    productDetails.appendChild(imageContainer);

    const rating = document.createElement('p');
    rating.textContent = `Avaliação: ${product.rating.rate} (${product.rating.count} visualizações)`;
    productDetails.appendChild(rating);

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Comprar';
    buyButton.classList.add('btn', 'btn-white'); // Adicionar classes personalizadas para estilo de botão branco
    productDetails.appendChild(buyButton);
  })
  .catch(error => console.log(error));