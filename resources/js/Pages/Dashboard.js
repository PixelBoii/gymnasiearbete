import React, { useState, Fragment } from 'react';
import { usePage, useForm, Head } from '@inertiajs/inertia-react'
import { Dialog, Transition } from '@headlessui/react';

export default function Dashboard(props) {
    const page = usePage();
    const { devices } = page.props;

    const [selectedDevice, setSelectedDevice] = useState(devices.length > 0 ? devices[0] : null);
    const [displayDeviceDropdown, setDisplayDeviceDropdown] = useState(false);

    const [isOpen, setIsOpen] = useState(false)

    let form = useForm({
        name: '',
    })

    function handleDeviceCreate(e) {
        e.preventDefault()
        form.post('/dashboard/devices')
    }

    return (
        <>
            <Head title="Dashboard" />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                        &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <form onSubmit={handleDeviceCreate}>
                                    <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900"> Add new device </Dialog.Title>

                                    <div className="mt-2">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="device-name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="device-name"
                                                id="device-name"
                                                value={form.name}
                                                onChange={(e) => form.setData('name', e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Create it!
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white bg-opacity-80 fixed top-0 inset-x-0 z-10">
                    <div className="flex items-center justify-end h-16 space-x-4 py-2 px-4 sm:px-6 lg:px-8">
                        <div className="relative">
                            <div className="bg-blue-50 rounded-md px-2 py-2 w-52 flex justify-between items-center cursor-pointer" onClick={() => setDisplayDeviceDropdown(!displayDeviceDropdown)}>
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-gray-700 font-semibold text-sm"> {selectedDevice ? selectedDevice.name : 'No device selected'} </p>
                                </div>

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            {displayDeviceDropdown && (
                                <div className="absolute top-16 space-y-2 left-0 z-10 w-64 overflow-y-auto max-h-[calc(100vh-6rem)]">
                                    {devices.map((device) => (
                                        <div key={device.id} className="bg-blue-50 bg-opacity-70 shadow rounded-md backdrop-blur-sm w-full px-3 py-3 cursor-pointer flex items-center space-x-4" onClick={() => setSelectedDevice(device)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                            <div>
                                                <p className="text-gray-700 font-bold text-sm"> {device.name} </p>
                                                <p className="text-gray-500 font-semibold text-xs"> 32 days left ({device.battery_level}%) </p>
                                                <p className="text-gray-500 font-semibold text-xs"> Last updated 35 min ago </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-gray-700 font-bold text-lg cursor-pointer" onClick={() => setIsOpen(true)}> + </p>
                        </div>
                    </div>
                </nav>

                <div className="h-screen w-screen relative">
                    { selectedDevice && selectedDevice.last_location ? (
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps/embed/v1/place?key=${props.secrets.google_maps_api_key}&q=${selectedDevice.last_location.position.coordinates.join(',')}&zoom=3`}>
                        </iframe>
                    ) : (
                        <div className="flex justify-center items-center h-full w-full">
                            <p className="text-gray-500 text-center text-2xl font-semibold"> No location data available just yet. </p>
                        </div>
                    ) }
                </div>
            </div>
        </>
    );
}
