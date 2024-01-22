import React, { useEffect } from "react"
import Header from "./components/header/Header"
import { useAppDispatch } from "../../app/hooks"
import { getUserInfo } from "../../app/slices/User/userSlice"

type Props = {}

const AdminPage = (props: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserInfo(1))
  }, [])

  return (
    <div>
      <Header />
    </div>
  )
}

export default AdminPage
