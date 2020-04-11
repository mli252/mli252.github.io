/** Add any JavaScript you need to this file. */
(function() {
  function div(content) {
    let div = document.createElement('div');
    div.innerHTML = content;
    return div;
  }

  let gridHelper = {
    categoryCollectionToImg: function(fitment) {
      let img = document.createElement('img');
      img.src = 'images/' + fitment.category + '-' + fitment.collection + '.jpg';
      img.alt = '';
      return img;
    },

    fitmentToTile: function(fitment) {
      let tile = div('');
      tile.id = fitment.category + '_' + fitment.collection;
      tile.appendChild(gridHelper.categoryCollectionToImg(fitment));
      tile.appendChild(
        div(fitment.collection.toUpperCase() + ' ' + fitment.category.toUpperCase())
      );
      tile.appendChild(div(fitment.description));
      tile.appendChild(div('&#36;' + fitment.price));
      return tile;
    },

    fitmentsToGrid: function(fitments) {
      let grid = document.getElementById('main_grid');
      fitments.forEach(function(fitment) {
        grid.appendChild(gridHelper.fitmentToTile(fitment));
      });
    },

    loadGrid: function() {
      gridHelper.fitmentsToGrid(window.fitmentsData);
    },

    showByCategory: function(category) {
      category = category || '';
      let grid = document.getElementById('main_grid');
      grid.childNodes.forEach(function(tile) {
        tile.style.display = tile.id.startsWith(category) ? 'flex' : 'none';
      });
    },

    showByCollection: function(collection) {
      collection = collection || '';
      let grid = document.getElementById('main_grid');
      grid.childNodes.forEach(function(tile) {
        tile.style.display = tile.id.endsWith(collection) ? 'flex' : 'none';
      });
    }
  };

  function setupMenuHandlers() {
    gridHelper.loadGrid();

    function getMenuHandlerByCategory(category) {
      return function() {
        gridHelper.showByCategory(category);
      };
    }

    document.getElementById('nav_all').onclick = getMenuHandlerByCategory('');
    document.getElementById('nav_desk').onclick = getMenuHandlerByCategory('desk');
    document.getElementById('nav_table').onclick = getMenuHandlerByCategory('table');
    document.getElementById('nav_chair').onclick = getMenuHandlerByCategory('chair');
  }

  window.onload = setupMenuHandlers;
})();
