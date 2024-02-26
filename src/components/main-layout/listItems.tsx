import * as React from 'react'

import { DesignServices, Extension } from '@mui/icons-material'
import BarChartIcon from '@mui/icons-material/BarChart'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon color="secondary">
        <DesignServices color="primary" />
      </ListItemIcon>
      <ListItemText primary="Замер" />
    </ListItemButton>
    {/* <ListItemButton>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Orders" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Customers" />
		</ListItemButton> */}
    <ListItemButton>
      <ListItemIcon>
        <Extension />
      </ListItemIcon>
      <ListItemText primary="Конфигурация" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Постановка" />
    </ListItemButton>
  </React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
			Saved reports
		</ListSubheader>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItemButton> */}
  </React.Fragment>
)
