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
    public filterCms(contentKey: string){
      return this.axios.get(`/cms-service?contentKey=${contentKey}`)
    }
    public filterMechanism(contentKey: string) {
      return this.axios.get(`/cms-service/filter?contentKey=${contentKey}`)
    }
    public cmsCurrentScreen() {
      return this.axios.get('/cms-service/current-screen')
    }
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
    public updateToPageNotFound(){
      return this.axios.put('/cms-service/page-not-found')
    }
 }