import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { globalApi } from "../../../configs/axios/axiosInstace"
import axios from "axios"
import { API_URL } from "../../../utils/consts"

export interface IBranch {
    id: number,
    name: string,
    skil_parent_id: number
}
export interface ISkill {
    id: number,
    name: string,
    branches: IBranch[]
}
export interface IProject {
    id: number,
    img: string,
    name: string,
    github: string,
    link: string
}

export interface initialState {
    id: number,
    name: string,
    position: string,
    experience: string,
    skills: ISkill[],
    services: string[],
    projects: IProject[],
    socials: {
        email: { name: string, link: string },
        whatsapp: { name: string, link: string },
        messenger: { name: string, link: string },
        facebook: { name: string, link: string },
    }
}

const initialState: initialState = {
    id: 1,
    name: '',
    experience: '',
    position: '',
    skills: [],
    services: [],
    projects: [],
    socials: {
        email: { name: '', link: '' },
        whatsapp: { name: '', link: '' },
        messenger: { name: '', link: '' },
        facebook: { name: '', link: '' },
    }
}

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async (id: number, { dispatch }) => {
        try {
            const response = await globalApi.get(`/users/${id}`)
            dispatch(setUser(response.data))
            return response.data
        }
        catch (err) {
            console.log(err)
        }
    },
)


export const createNewSkill = createAsyncThunk(
    "user/createNewSkill",
    async (payload: { id: number, newSkillName: string }, { dispatch }) => {
        try {
            const response = await globalApi.post(`/skills/create`, { user_id: payload.id, name: payload.newSkillName })
            dispatch(addSkill(response.data))
            return response.data
        }
        catch (err) {
            console.log(err)
        }
    },
)

export const createNewBranch = createAsyncThunk(
    "user/createNewBranch",
    async (payload: { name: string, skill_parent_id: number }, { dispatch }) => {
        try {
            const response = await globalApi.post(`/branches/create`, { name: payload.name, skill_parent_id: payload.skill_parent_id })
            dispatch(addBranch(response.data))
            return response.data
        }
        catch (err) {
            console.log(err)
        }
    },
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<any>) => {
            state.name = payload.name
            state.experience = payload.experience
            state.position = payload.position
            state.skills = payload.skills
        },
        addSkill: (state, { payload }: PayloadAction<ISkill>) => {
            state.skills.push(payload)
        },
        setSkills: (state, { payload }: PayloadAction<ISkill[]>) => {
            state.skills = payload
        },
        removeSkill: (state, { payload }: PayloadAction<{ id: number }>) => {
            state.skills = state.skills.filter(skill => skill.id !== payload.id)
        },
        addBranch: (state, { payload }: PayloadAction<{ id: number, branch: IBranch }>) => {
            state.skills = state.skills.map(skill => {
                if (skill.id === payload.id) {
                    skill.branches.push(payload.branch)
                }
                return skill
            })
        },
        removeBranch: (state, { payload }: PayloadAction<{ id: number, branchId: number }>) => {
            state.skills = state.skills.map(skill => {
                if (skill.id === payload.id) {
                    skill.branches = skill.branches.filter(branch => branch.id !== payload.branchId)
                }
                return skill
            })
        },

    },
})

export const {
    setUser,
    addSkill,
    setSkills,
    removeSkill,
    addBranch,
    removeBranch,
} = userSlice.actions

export default userSlice.reducer
