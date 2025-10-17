async function fetchPokemon(){
    try {

        const searchPokemon = document.getElementById("search-pokemon").value.toLowerCase();
        const pokemonId = document.getElementById("pokemon-id");
        const pokemonImg = document.getElementById("pokemon-img");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonAbility = document.getElementById("pokemon-ability");
      const pokemonHeight = document.getElementById("pokemon-height");
      const pokemonWeight = document.getElementById("pokemon-weight");
      const pokemonType = document.getElementById("pokemon-type");
      const pokemonItems = document.getElementById("pokemon-items");

        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const result = await response.json();

        const pokemonSprite = result.sprites.front_default;
        pokemonImg.src = pokemonSprite;
        pokemonImg.style.display = 'block';
        
        const abilities = result.abilities.map(ability => ability.ability.name).join(', ');
        pokemonAbility.textContent = `Abilities: ${abilities}`;
        
        pokemonId.textContent = `Pokemon ID: ${result.id}`;
        
        pokemonName.textContent = `Pokemon Name: ${result.name.charAt(0).toUpperCase() + result.name.slice(1)}`;
      
      pokemonHeight.textContent = `Height: ${result.height}`;
      pokemonWeight.textContent = `Weight: ${result.weight}`;
      pokemonType.textContent = `Type: ${result.types.map(type => type.type.name).join('/ ')}`;
      
      if(result.held_items && result.held_items.length > 0) {
        pokemonItems.textContent = `Held items: ${result.held_items.map(items => items.item.name).join(', ')}`;
      } else {
        pokemonItems.textContent = `Held items: None`;
      }
      
    } catch(error){
        console.error(error);
        // Optional: Show error message to user
        alert("Pokemon not found! Please check the name and try again.");
    }
}