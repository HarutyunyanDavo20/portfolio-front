import React, { useState } from "react"
import { createNewSkill } from "../../../../app/slices/User/userSlice"
import { GrAdd } from "react-icons/gr"
import EditRow from "../editRow/EditRow"
import Skill from "../skills/skill/Skill"
import "./Header.css"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"

const Header = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const [newSkillName, setNewSkillName] = useState("")

  const handleAddNewSkill = () => {
    dispatch(createNewSkill({ id: user.id, newSkillName }))
  }
  const changeNewSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkillName(e.target.value)
  }

  console.log(user.skills)


  return (
    <div>
      <h3 className="admin__header_title">
        Hi {user.name}. You can edit your information here
      </h3>
      <div className="admin__edit_labels_components">
        <EditRow title="name" placeholder={user.name} />
        <EditRow title="position" placeholder={user.position} />
        <EditRow title="experience" placeholder={user.experience} />

        <div className="admin__skills">
          <h1 className="admin__skills_title">Skills</h1>
          {user.skills.map((skill) => (
            <Skill
              key={skill.id}
              skill_parent_id={skill.id}
              name={skill.name}
              branches={skill.branches}
            />
          ))}
          <div className="admin__skills_adding_new_skill_block">
            <input
              className="admin__skills_input_for_adding"
              placeholder="New Skill name"
              value={newSkillName}
              onChange={changeNewSkill}
            />
            <GrAdd onClick={handleAddNewSkill} size={40} color="orange" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
