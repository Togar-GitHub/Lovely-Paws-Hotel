import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  pets: [],
  selectedPet: null,
  status: 'idle',
  error: null,
};

export const fetchAllPets = createAsyncThunk(
  'pets/fetchAllPets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/pets/');
      const data = await response.json();
      console.log('fetchAllPets data:', data);
      if (!response.ok) {
        throw new Error(`Error fetching pets: ${data.message}`);
      }
      return data;
    } catch (error) {
      console.error('fetchAllPets error:', error);
      return rejectWithValue(error.message || 'Issue fetching all pets');
    }
  }
);

export const fetchUserPets = createAsyncThunk(
  'pets/fetchUserPets',
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetchUserPets action triggered');
      const response = await fetch('/api/pets/user');
      console.log('fetchUserPets response:', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching pets: ${errorData.message}`);
      }
      const data = await response.json();
      console.log('fetchUserPets data:', data);
      return data;
    } catch (error) {
      console.error('fetchUserPets error:', error);
      return rejectWithValue(error.message || 'Issue fetching user pets');
    }
  }
);

export const fetchPetDetail = createAsyncThunk(
  'pets/fetchPetDetail',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/pets/${petId}`);
      console.log('fetchPetDetail response:', response);
      const data = await response.json();
      console.log('fetchPetDetail data:', data);
      if (!response.ok) {
        throw new Error(`Error fetching pet details: ${data.message}`);
      }
      return data;
    } catch (error) {
      console.error('fetchPetDetail error:', error);
      return rejectWithValue(error.message || 'Issue fetching pet details');
    }
  }
);

export const addPet = createAsyncThunk(
  'pets/addPet',
  async (petData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/pets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error adding pet: ${data.message}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Issue adding pet');
    }
  }
);

export const updatePet = createAsyncThunk(
  'pets/updatePet',
  async ({ petId, petData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error updating pet: ${data.message}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Issue updating pet');
    }
  }
);

export const deletePet = createAsyncThunk(
  'pets/deletePet',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/pets/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error deleting pet: ${data.message}`);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Issue deleting pet');
    }
  }
);

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllPets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = action.payload.Pets;
      })
      .addCase(fetchAllPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('fetchAllPets rejected with error:', action.payload);
      })
      .addCase(fetchUserPets.pending, (state) => {
        console.log('fetchUserPets pending');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserPets.fulfilled, (state, action) => {
        console.log('fetchUserPets fulfilled with payload:', action.payload);
        state.status = 'succeeded';
        state.pets = action.payload.Pets;
      })
      .addCase(fetchUserPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('fetchUserPets rejected with error:', action.payload);
      })
      .addCase(fetchPetDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPetDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPet = action.payload;
      })
      .addCase(fetchPetDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('fetchPetDetail rejected with error:', action.payload);
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets.push(action.payload);
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
        state.pets[index] = action.payload;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter((pet) => pet.id !== action.payload);
      });
  },
});

export default petsSlice.reducer;