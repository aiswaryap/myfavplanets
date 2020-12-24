import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  
const PlanetList = () => {

    useEffect(() => {
        getPlanets()
    }, [])

    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const getPlanets = () => {
        axios.get("https://assignment-machstatz.herokuapp.com/planet")
        .then(res => {
            console.log("list: ", res.data);
            // res.data.map(item => )
            setPlanetList(res.data)
        })
        .then(err => {
            console.log("Error: ", err)
        })
    }
    const [planetList, setPlanetList] = useState([{id: "1", isFavourite: true, name: "Mercury"}])
    const [favList, setFavlist] = useState([])
    const handleFavourite = (id) => {
        let total = favList;
        let newList = []
        for(let i = 0; i<planetList.length; i++){
          if(planetList[i].id === id)
          {
            newList.push({id: planetList[i].id, isFavourite: true, name: planetList[i].name})
          }
          else {
            newList.push({id: planetList[i].id, isFavourite: planetList[i].isFavourite, name: planetList[i].name})
          }
        }
        setPlanetList(newList)
        // planetList.map(data => data.id === id ? total.push(data) : "")
    }
    return (
        <div>
           <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Planets List" {...a11yProps(0)} />
          <Tab label="Favourites" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <table>
            <tbody>
                <tr>
                    <th>Planets</th>
                    <th>Mark as Favourite</th>
                </tr>
                {planetList.map(data => 
                    <tr>
                        <td>{data.name}</td>
                        <td><button onClick={() => handleFavourite(data.id)}>{data.isFavourite ? "Favourite" : "Mark"}</button></td>
                    </tr>    
                )}
            </tbody>
        </table>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <table>
            <tbody>
                <tr>
                    <th>Planets</th>
                </tr>
                {planetList.map(data => 
                data.isFavourite &&
                    <tr>
                        <td>{data.name}</td>
                    </tr>    
                )}
            </tbody>
        </table>
      </TabPanel>
        </div>
    )
   
    
}

export default PlanetList;