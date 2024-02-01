/**
 * Property of the Digital Resolve Organization.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Product Engineering Team/Software Engineering Innovation Group
 */

import {
    AxiosInstance
 } from 'axios'

 export class CmsApi {
    constructor(private readonly axios: AxiosInstance){}
    public filterCms(props: {
      currentKey: string
    }){
      return this.axios.post(`/cms-service/cms-list`, props)
    }
    public filterMechanism(props : {
      currentKey: string
    }) {
      return this.axios.post(`/cms-service/filter`, props)
    }
    public cmsInit(){
      return this.axios.post('/cms-service/cms-init-enrollment')
    }
    /**
     * 
     * @deprecated
     */
    public cmsCurrentScreen() {
      return this.axios.get('/cms-service/current-screen')
    }
    /**
     * 
     * @deprecated
     */
    public cmsChangeScreen(props: {
      currentKey: string
    }) {
      return this.axios.put(`/cms-service/update-current-screen`, props)
    }
    public findCmsPaths(props: {
      currentKey: string
    }){
      return this.axios.post('/cms-service/find-paths', props)
    }
    /**
     * 
     * @deprecated
     */
    public updateToPageNotFound(){
      return this.axios.put('/cms-service/page-not-found')
    }
 }