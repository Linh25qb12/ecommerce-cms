'use client'

import { useOrigin } from "@/hook/useOrigin";
import { stripe } from "@/lib/stripe";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const DeployButton = ({ storeId, storeName }: { storeId: string, storeName: string }) => {

    const origin = useOrigin();
    const [domain, setDomain] = useState('');
    const [storeUrl, setStoreUrl] = useState<string>('');
    const router = useRouter();

    const deployProduction = async () => {
        try {
            const connectList = await axios.get('/api/connect');

            if (connectList.data.length <= 0) {
                Modal.confirm({
                    title: 'Stripe account create?',
                    content: (
                        <p>You currently have not linked a payment method to your current account.<br />
                            Please create a stripe account to be able to perform all the functions of the website. </p>
                    ),
                    onOk: async () => {
                        try {
                            const account = await stripe.accounts.create({
                                type: 'standard',
                            });
                            await axios.post('/api/connect', {
                                connectId: account.id
                            });

                            const accountLink = await stripe.accountLinks.create({
                                account: account.id,
                                refresh_url: origin,
                                return_url: origin,
                                type: 'account_onboarding',
                            });
                            router.push(accountLink.url);
                        } catch (error) {
                            console.log(error);
                            
                            notification.error({
                                message: 'Somthing went wrong!',
                                placement: "bottomRight",
                                duration: 2
                            })
                        }
                    },
                })
            } else {
                const githubRepo = await axios.post(`/api/${storeId}/github/repo`, { repoName: storeName });
                const project = await axios.post(`/api/${storeId}/project`, { projectName: githubRepo.data.data.name.toLowerCase() });
                await axios.post(`/api/${storeId}/github/commit`, { repoName: githubRepo.data.data.name });
                const domain = await axios.get(`/api/${storeId}/project/${project.data.id}`);
                await axios.patch(`/api/store/${storeId}`, {
                    connectId: connectList.data[0].connectId,
                    name: storeName,
                    websiteUrl: domain.data.domains[0].name
                });
                
                setDomain(domain.data.domains[0].name)
            }

        } catch (error) {
            console.log(error);
        }
    };

     useEffect(() => {
        const fetchStore = async () => {
            const store = await axios.get(`/api/store/${storeId}`);
            setStoreUrl(store.data.websiteUrl);
        };
        fetchStore();
    }, [])

    return (
        <>
            {domain.length > 0 || storeUrl.length > 0
                ? <Button size="large" type="primary"><a target="_blank" href={`https://${storeUrl || domain}` }>Visit Website</a></Button>
                : <Button size="large" type="primary" onClick={deployProduction}>Deploy production</Button>}
        </>
    )
};