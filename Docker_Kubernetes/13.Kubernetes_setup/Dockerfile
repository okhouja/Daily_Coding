FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]

# kubectl create deployment first-app --image=omar0940/kub-first-app 
# kubectl get deployments
# kubectl get pods
# ** to EXPOSE a Deployment with a service
# kubectl expose deployment first-app --type=LoadBalancer --port=8080
# kubectl get services
# ** to create IP adress to reach the service and pods
# minikube service first-app 
# Scalling the pods 
# kubectl scale deployment/first-app --replicas=3
# to update the deployment after push the new image with new tag like v2 to docker hub
# kubectl set image deployment/first-app kub-first-app=omar0940/kub-first-app:v2

# to check the status of the new deployment
# kubectl rollout status deployment/first-app

# to rollback to the deployment that works fine
# kubectl rollout undo deployment/first-app

# to check the Deployment history
# kubectl rollout history deployment/first-app

# to see more information about specific deployment version 
# kubectl rollout history deployment/first-app --revision=2


# to go back to specified deployment version
# kubectl rollout undo deployment/first-app --to-revision=1

# to delete deployment
# kubectl delete deployment/first-app

# to delete service
# kubectl delete service first-app