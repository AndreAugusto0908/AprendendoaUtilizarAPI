fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    const productContainer = document.getElementById('productContainer');
    
    json.forEach(product => {
      const productSection = document.createElement('section');
      productSection.classList.add('product-section');

      const nameLink = document.createElement('a');
      nameLink.textContent = product.title;
      nameLink.href = `product.html?id=${product.id}`;
      nameLink.target = "_blank";
      productSection.appendChild(nameLink);

      const image = document.createElement('img');
      image.src = product.image;
      productSection.appendChild(image);

      productContainer.appendChild(productSection);
    });
  })
  .catch(error => console.log(error));







  const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const searchResults = document.getElementById('search-results');

fetch('https://fakestoreapi.com/products/categories')
  .then(res => res.json())
  .then(categories => {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.toLowerCase();
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

searchInput.addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase();
  const selectedCategory = categorySelect.value.toLowerCase();

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      let filteredProducts = data;

      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.toLowerCase() === selectedCategory
        );
      }

      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );

      displayResults(filteredProducts);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
});

categorySelect.addEventListener('change', function(event) {
  const selectedCategory = event.target.value.toLowerCase();

  if (selectedCategory) {
    fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then(res => res.json())
      .then(products => {
        displayResults(products);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  } else {
    // Caso "Nenhuma categoria" seja selecionada, realizar a pesquisa com base no termo de pesquisa
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const filteredProducts = data.filter(product =>
          product.title.toLowerCase().includes(searchTerm)
        );
        displayResults(filteredProducts);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  }
});

function displayResults(products) {
  searchResults.innerHTML = ''; // Limpar os resultados anteriores

  if (products.length === 0) {
    searchResults.style.display = 'none'; // Esconder a lista quando não houver resultados
  } else {
    searchResults.style.display = 'block'; // Mostrar a lista quando houver resultados

    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = product.title;
      listItem.addEventListener('click', () => {
        window.open(`product.html?id=${product.id}`, '_blank');
      });
      searchResults.appendChild(listItem);
    });
  }
}