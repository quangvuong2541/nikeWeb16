import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { AppBar, Grid, Hidden } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionType from "./module/constant/constant"
import * as action from "./module/action/action"
import API from '../../Axios/API';

const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 44,
        marginBottom: 44,
        padding: "0 20px"
    }
}))

const ListProduct = () => {
    const classes = useStyles()
    const [HideFilter, setHideFilter] = useState(false)
    const [SortBy, setSortBy] = useState(false)
    const gender = useSelector(state => state.reducerURL.gender)
    const typeProduct = useSelector(state => state.reducerURL.typeProduct)
    const GenderAndTypeProduct = {
        "gender": gender,
        "typeProduct": typeProduct
    }
    const dispatch = useDispatch()
    const data = useSelector(state => state.reducerURL.data)
    const dataSearchList = useSelector(state => state.reducerURL.dataSearchList)
    const dataSearchInput = useSelector(state => state.reducerURL.dataSearchInput)



    React.useEffect(() => {
        const callAPI = async () => {
            try {
                if (gender === 'search' && typeProduct == ' search') {
                    const res = await API(`product`, "GET")
                    const dataAll = res.data
                    const dataSearch = dataAll.filter((item, index) => {
                        return item.name.toLowerCase().indexOf(dataSearchInput.toLowerCase()) > -1
                    })
                    dispatch(action.createAction({ type: ActionType.FETCH_API_LIST_PRODUCT, payload: dataSearch }))
                } else {
                    dispatch(action.createAction({ type: ActionType.IS_LOADING_LIST_PRODUCT, payload: true }))
                    const res = await API(`product/?gender=${gender}&typeProduct=${typeProduct}`, "GET")
                    dispatch(action.createAction({ type: ActionType.FETCH_API_LIST_PRODUCT, payload: res.data }))
                    dispatch(action.createAction({ type: ActionType.IS_LOADING_LIST_PRODUCT, payload: false }))
                }
                localStorage.setItem("GenderAndTypeProduct", JSON.stringify(GenderAndTypeProduct))
            } catch (error) {
                console.log({ ...error });
            }
            return () => {
                dispatch(action.createAction({ type: ActionType.CHANGE_GENDER_TYPEPRODUCT, payload: { gender: null, typeProduct: null } }))
            }
        }
        callAPI()
    }, [gender, typeProduct, dataSearchList])

    // call data tu redux
    const filterColor = useSelector(state => state.reducerURL.filterColor)
    const filterSize = useSelector(state => state.reducerURL.filterSize)
    const filterSort = useSelector(state => state.reducerURL.dataSort)
    const dataFilter = useSelector(state => state.reducerURL.dataFilter)
    const sortByTitle = useSelector(state => state.reducerURL.sortByTitle)
    return (
        <div>ListProduct</div>
    )
}

export default ListProduct